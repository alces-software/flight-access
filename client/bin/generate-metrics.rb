require 'pathname'
require 'json'

DATA_QUANTITY = 24 * 28  # One data point every hour for 28 days.
CLUSTERS = [
  { id: 'MEG', metric_size: 'large' },
  { id: 'OPT', metric_size: 'small' },
]
METRIC_NAMES = %w(
available_storage
gpus_available
job_wait_time
load
)
INITIAL_TIMESTAMP = 1537398000
DELTAS = [-4,-3,-2,-2,-1,-1,0,1,1,2,2,3,4]

def main
  metrics = generate(CLUSTERS, METRIC_NAMES)
  write(metrics)
end

def generate(clusters, metric_names)
  clusters.inject({}) do |acc, cluster|
    acc[cluster[:id]] = generate_metrics(metric_names, cluster[:metric_size])
    acc
  end
end

def generate_metrics(metric_names, size, metrics=[], count=0)
  return metrics if count >= DATA_QUANTITY

  previous_metrics = metrics.last || {}
  old_timestamp = previous_metrics[:timestamp]
  new_timestamp = old_timestamp.nil? ? INITIAL_TIMESTAMP : old_timestamp + 3600
  new_metrics = metric_names.reduce({ timestamp: new_timestamp }) do |acc, metric_name|
    acc[metric_name] = generate_value(size, previous_metrics[metric_name])
    acc
  end
  generate_metrics(metric_names, size, metrics.push(new_metrics), count + 1)
end

def generate_value(size, previous_value)
  if previous_value.nil?
    if size == 'large'
      return rand(50..90)
    else
      return rand(10..60)
    end
  end
  unconstrained = previous_value + DELTAS.sample
  [ [ 0, unconstrained ].max, 100 ].min
end

def write(metrics)
  path = Pathname.new(__FILE__).join('../../src/modules/metrics/data/metrics.json')
  File.write(path, metrics.to_json)
end

if __FILE__ == $0
  main()
end

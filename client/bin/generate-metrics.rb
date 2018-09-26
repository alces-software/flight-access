require 'pathname'
require 'json'

DATA_QUANTITY = 24 * 28  # One data point every hour for 28 days.
CLUSTERS = [
  { id: 'MEG', metric_size: 'large' },
  { id: 'OPT', metric_size: 'small' },
]
METRIC_DEFNS = [
 { name: 'storage_in_use', max: { large: 100, small: 30 }, deltas: [0,0,0,0,0,0,0,0,0,0,0,0,0,1] },
 { name: 'gpus_in_use', max: { large: 100, small: 50 } },
 { name: 'job_wait_time', max: { large: 100, small: 30 } },
 { name: 'load', max: { large: 100, small: 60 } },
]
INITIAL_TIMESTAMP = 1537398000
DELTAS = [-4,-3,-2,-2,-1,-1,0,1,1,2,2,3,4]

def main
  metrics = generate(CLUSTERS, METRIC_DEFNS)
  write(metrics)
end

def generate(clusters, metric_defns)
  clusters.inject({}) do |acc, cluster|
    acc[cluster[:id]] = generate_metrics(metric_defns, cluster[:metric_size])
    acc
  end
end

def generate_metrics(metric_defns, size, metrics=[], count=0)
  return metrics if count >= DATA_QUANTITY

  previous_metrics = metrics.last || {}
  old_timestamp = previous_metrics[:timestamp]
  new_timestamp = old_timestamp.nil? ? INITIAL_TIMESTAMP : old_timestamp + 3600
  new_metrics = metric_defns.reduce({ timestamp: new_timestamp }) do |acc, metric_defn|
    metric_name = metric_defn[:name]
    acc[metric_name] = generate_value(size, metric_defn, previous_metrics[metric_name])
    acc
  end
  generate_metrics(metric_defns, size, metrics.push(new_metrics), count + 1)
end

def generate_value(size, metric_defn, previous_value)
  if previous_value.nil?
    if size == 'large'
      return rand(50..(metric_defn[:max][:large] - 10))
    else
      return rand(10..(metric_defn[:max][:small] - 10))
    end
  end
  deltas = metric_defn[:deltas].nil? ? DELTAS : metric_defn[:deltas]
  unconstrained = previous_value + deltas.sample
  min_value = 0
  max_value = metric_defn[:max][size.to_sym]
  [ [ min_value, unconstrained ].max, max_value ].min
end

def write(metrics)
  path = Pathname.new(__FILE__).join('../../src/modules/metrics/data/metrics.json')
  File.write(path, metrics.to_json)
end

if __FILE__ == $0
  main()
end

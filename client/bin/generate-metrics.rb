require 'pathname'
require 'json'

DATA_QUANTITY = 24 * 28  # One data point every hour for 28 days.
CLUSTER_IDS = ['demo', 'pres']
METRIC_NAMES = %w(
nodesAvailableToScheduler
nodesAvailableToQueueByNode
nodesAvailableToQueueBySlot
)
INITIAL_TIMESTAMP = 1537398000

def main
  metrics = generate(CLUSTER_IDS, METRIC_NAMES)
  write(metrics)
end

def generate(cluster_ids, metric_names)
  cluster_ids.inject({}) do |acc, id|
    acc[id] = generate_metrics(metric_names)
    acc
  end
end

def generate_metrics(metric_names, metrics=[], count=0)
  return metrics if count >= DATA_QUANTITY

  previous_metrics = metrics.last || {}
  old_timestamp = previous_metrics[:timestamp]
  new_timestamp = old_timestamp.nil? ? INITIAL_TIMESTAMP : old_timestamp + 3600
  new_metrics = metric_names.reduce({ timestamp: new_timestamp }) do |acc, metric_name|
    acc[metric_name] = generate_value(previous_metrics[metric_name])
    acc
  end
  generate_metrics(metric_names, metrics.push(new_metrics), count + 1)
end

def generate_value(previous_value)
  if previous_value.nil?
    return rand(0..100)
  end
  unconstrained = previous_value + rand(-5..+5)
  [ [ 0, unconstrained ].max, 100 ].min
end

def write(metrics)
  path = Pathname.new(__FILE__).join('../../src/modules/metrics/data/metrics.json')
::STDERR.puts "=== path: #{(path).inspect rescue $!.message}"
  File.write(path, metrics.to_json)
end

if __FILE__ == $0
  main()
end

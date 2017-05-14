json.my_feelings do
  json.array!(@my_feelings) do |my_feeling|
    json.name my_feeling.name
    json.create_time my_feeling.create_time
  end
end
json.message @message if @message

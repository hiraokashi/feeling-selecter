json.array!(@feelings) do |feeling|
  json.extract! feeling, :id, :name
  #json.url product_url(product, format: :json)
end

class Feeling < ActiveHash::Base
  self.data = [
    {id: 1, name: '喜'},
    {id: 2, name: '怒'},
    {id: 3, name: '哀'},
    {id: 4, name: '楽'},
    {id: 5, name: '愛'},
    {id: 6, name: '憎'},
  ]
end

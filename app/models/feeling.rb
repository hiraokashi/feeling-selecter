class Feeling < ActiveHash::Base
  self.data = [
    {id: 1, name: '喜', type: :positive, ja_name: '喜び'},
    {id: 2, name: '怒', type: :negative, ja_name: '怒り'},
    {id: 3, name: '哀', type: :negative, ja_name: '哀しみ'},
    {id: 4, name: '楽', type: :positive, ja_name: '楽しみ'},
    {id: 5, name: '愛', type: :positive, ja_name: '愛'},
    {id: 6, name: '憎', type: :negative, ja_name: '憎しみ'},
  ]

  def call_out_word

    if type == :positive
      "良い傾向です！"
    else
      "大丈夫ですか！何かつ辛いことがありましたかk"
    end
  end
end

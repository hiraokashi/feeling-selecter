class MyFeeling < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :user
  belongs_to_active_hash :feeling

  delegate :name, to: :feeling,  allow_nil: true

  def create_time
    created_at.strftime('%Y/%m/%d')
  end
end

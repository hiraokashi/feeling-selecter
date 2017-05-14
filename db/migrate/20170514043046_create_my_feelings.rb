class CreateMyFeelings < ActiveRecord::Migration[5.0]
  def change
    create_table :my_feelings do |t|
      t.integer :user_id, null: false
      t.integer :feeling_id, null: false
      t.timestamps
    end
  end
end

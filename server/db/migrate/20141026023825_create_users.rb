class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :phone_number
      t.string :sim_serial_number
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :address

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :phone_number, unique: true
    add_index :users, :sim_serial_number, unique: true
    add_index :users, :email, unique: true
  end
end

class UsersController < ApplicationController
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.where(sim_serial_number: params[:id]).first

    render json: @user
  end

  # POST /users
  # POST /users.json
  def create
    # params[:user] = JSON.parse params[:user]
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    @user = User.where(sim_serial_number: params[:id]).first

    if @user.update(user_params)
      head :no_content
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.where(sim_serial_number: params[:id]).first
    @user.destroy

    head :no_content
  end

  private

    def user_params
      params.require(:user).permit(:username, :phone_number, :sim_serial_number, :email, :first_name, :last_name, :address)
    end
end

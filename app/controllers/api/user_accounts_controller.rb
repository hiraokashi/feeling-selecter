class Api::UserAccountsController < ApplicationController
  skip_before_action :require_valid_token, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      api_key = @user.activate
      @access_token = api_key.access_token
    else
      @errors = @user.errors.full_messages.join(', ')
      respond_to do |format|
        format.json { render plain: @errors, status: 400 }
      end
    end
  end

  private
  def user_params

    params.require(:user).permit(
      :email, :password, :password_confirmation
    )
  end
end

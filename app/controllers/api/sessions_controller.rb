class Api::SessionsController < ApplicationController
  skip_before_action :require_valid_token, only: [:create, :show]

  def create
    if @user = login(login_user[:email], login_user[:password])
      api_key = @user.activate
      @access_token = api_key.access_token
      logger.info('login success !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    else
      respond_to do |format|
        format.json { render nothing: true, status: :not_found }
      end
    end
  end


  def show
    # ログイン状態の確認
    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    unless User.login?(access_token)
      head(:unauthorized)
    end

    #authorized  = access_token == 'dfsfsfsfsf'? :ok : :unauthorized
    #respond_to do |format|
    #  #format.json {render nothing: true, status: authorized }
    #  head(authorized)
    #end
    #head(authorized)
  end

  def destroy
    access_token = request.headers[:HTTP_ACCESS_TOKEN]
    api_key = ApiKey.find_by_access_token(access_token)
    if api_key
      user = User.find(api_key.user_id)
      user.inactivate
      respond_to do |format|
        format.json { render nothing: true, status: :ok }
      end
    end
  end

  private

  def login_user
    params[:user]
  end
end

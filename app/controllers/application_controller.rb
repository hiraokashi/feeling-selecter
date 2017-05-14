class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_valid_token

  private
  def require_valid_token
    if !User.login?(access_token)
      respond_to do |format|
        format.json { render nothing: true, status: :unauthorized }
      end
    end
  end

  def access_token
    @access_token ||= request.headers[:HTTP_ACCESS_TOKEN]
  end

  # ログインユーザ
  def current_user
    @current_user ||= ApiKey.find_by_access_token(access_token).try(:user)
  end
  helper_method :current_user
end

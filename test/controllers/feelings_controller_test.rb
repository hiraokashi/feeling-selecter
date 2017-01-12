require 'test_helper'

class FeelingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get feelings_index_url
    assert_response :success
  end

end

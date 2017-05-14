class Api::MyFeelingsController < ApplicationController


  def index
    @my_feelings = current_user.my_feelings
    set_my_feelings
  end

  def create
    @my_feeling = current_user.my_feelings.build(my_feeling_params)
    if @my_feeling.save
      set_my_feelings
    else
      respond_to do |format|
        format.json { render nothing: true, status: :not_found }
      end
    end
  end

  private

  def set_my_feelings
    @my_feelings = current_user.my_feelings
    if @my_feelings.present?
      max_contents = @my_feelings.group(:feeling_id).count(:id).max { |x, y| x[1] <=> y[1] }
      most_my_feeling_percentage = (max_contents[1] * 100 / @my_feelings.size).to_i
      feeling = Feeling.find(max_contents[0])
      @message = "あなたの感じた感情の#{most_my_feeling_percentage}%を#{feeling.try(:ja_name)}が占めています！\r#{feeling.call_out_word}"
    end
    @my_feelings = @my_feelings.order(created_at: :desc)
  end

  def my_feeling_params
    params.require(:my_feeling).permit(
      :feeling_id
    )
  end
end

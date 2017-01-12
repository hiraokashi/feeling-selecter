class Feelings extends React.Component {
  constructor() {
    super()
    this.state = {feelings: []}
  }
  render () {
    return (
      <div className='messages'>
        {this.props.feelings.map(function (feeling, i) {
           return <p key={i}>{feeling.name}</p>
        })}
      </div>
    )
  }
}


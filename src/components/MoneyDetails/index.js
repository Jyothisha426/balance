import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {imageUrl, title, alt, className} = moneyDetails

  return (
    <li className={`each-money-item ${className}`}>
      <img src={imageUrl} className="money-detail-image" alt={alt} />
      <div>
        <p className="title">{title}</p>
        <p className="money">Rs. 0</p>
      </div>
    </li>
  )
}

export default MoneyDetails

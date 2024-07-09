import './index.css'

const PasswordItem = props => {
  const {websiteDetails, showPassword, deleteItem} = props
  const {id, website, username, password} = websiteDetails
  const initial = website[0].toUpperCase()
  //   console.log(showPassword)
  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li className="list-item">
      <div className="initial-container">
        <p className="initial">{initial}</p>
      </div>
      <div className="name-container">
        <p className="website-heading">{website}</p>
        <p className="name">{username}</p>
        {showPassword ? (
          <p className="name">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem

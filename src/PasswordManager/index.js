import './index.css'

import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPassword: false,
  }

  addNewPassword = event => {
    event.preventDefault()
    const {passwordsList, website, username, password} = this.state
    const newWebsite = {
      id: v4(),
      website,
      username,
      password,
    }

    this.setState({
      passwordsList: [...passwordsList, newWebsite],
      website: '',
      username: '',
      password: '',
    })
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderAddNewPassword = () => {
    const {website, username, password} = this.state
    const screenWidth = window.innerWidth
    // console.log(screenWidth)
    const passwordManagerImgUrl =
      screenWidth > 768
        ? 'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.addNewPassword}>
          <h1 className="heading">Add New Password</h1>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-img"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Website"
              onChange={this.onChangeWebsite}
              value={website}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-img"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Username"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-img"
            />
            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
        <img
          src={passwordManagerImgUrl}
          alt="password manager"
          className="password-manager-img"
        />
      </div>
    )
  }

  renderNoPasswords = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeShowPassword = event => {
    // console.log(event.target.value)
    this.setState({
      showPassword: event.target.checked,
    })
  }

  deleteItem = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({
      passwordsList: filteredList,
    })
  }

  renderPasswordsList = () => {
    const {passwordsList, showPassword, searchInput} = this.state
    const searchedList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul>
        {searchedList.map(eachWebsite => (
          <PasswordItem
            key={eachWebsite.id}
            websiteDetails={eachWebsite}
            showPassword={showPassword}
            deleteItem={this.deleteItem}
          />
        ))}
      </ul>
    )
  }

  renderYourPasswords = () => {
    const {passwordsList, searchInput, showPassword} = this.state
    const searchedList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const noPasswords = searchedList.length === 0

    // console.log(passwordsList)
    return (
      <div className="your-password-container">
        <div className="header-search-container">
          <div className="header-container">
            <h1 className="passwords-heading">Your Passwords</h1>
            <p className="passwords-count">{searchedList.length}</p>
          </div>
          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-img"
            />
            <input
              type="search"
              className="search-input"
              placeholder="search"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={showPassword}
            onChange={this.onChangeShowPassword}
            id="check-box"
          />
          <label htmlFor="check-box" className="passwords-heading">
            Show Passwords
          </label>
        </div>
        {noPasswords && this.renderNoPasswords()}
        {!noPasswords && this.renderPasswordsList()}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo-img"
          />
          {this.renderAddNewPassword()}
          {this.renderYourPasswords()}
        </div>
      </div>
    )
  }
}

export default PasswordManager

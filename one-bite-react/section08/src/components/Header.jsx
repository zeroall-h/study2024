import './Header.css'
const Header = () =>{
  return <header>
    <h1 className='title'><span className="text_small">오늘은 🚩</span>{new Date().toDateString()}</h1>
  </header>
}

export default Header
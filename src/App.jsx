import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Providers
import TransactionProvider from "./contexts/TransactionProvider"

// App Components
import NavBar from "./components/NavBar"
import Dashboard from "./components/Dashboard"
import AddTransaction from "./components/AddTransaction"
import TransactionHistory from "./components/TransactionHistory"
import PageNotFound from "./components/PageNotFound"
import Footer from "./components/Footer"

function App() {
  

  return (
    <Router>
      <div className="container">
        <NavBar />
        <TransactionProvider>
        <main>
          <Routes>
              {/* App Pages */}
              <Route path="/" element={<Dashboard />}/>
              <Route path="/add" element={<AddTransaction />}/>
              <Route path="/history" element={<TransactionHistory />}/>
            
            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />}/>
          </Routes>
          <Footer />
        </main>
        </TransactionProvider>
      </div>
    </Router>
  )
}

export default App

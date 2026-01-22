import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Home from './pages/Home.tsx'
import { Layout } from './layouts/Layout.tsx';
import { ContactForm } from './pages/ContactForm.tsx';
import { Contacts } from './pages/Contacts.tsx';
import { User } from './pages/User.tsx';
import { ContactProvider } from './hooks/useContactReducer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContactProvider>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/:agenda/contacts" element={<Contacts />}></Route>
            <Route path="/contact-form" element={<ContactForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  </StrictMode>,
)

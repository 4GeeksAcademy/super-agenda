import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Home from './pages/Home.tsx'
import { Layout } from './layouts/Layout.tsx';
import { Contacts } from './pages/Contacts.tsx';
import { Agendas } from './pages/Agendas.tsx';
import { ContactProvider } from './hooks/useContactReducer.tsx';
import { AboutMe } from './pages/AboutMe.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContactProvider>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/agendas" element={<Agendas />}></Route>
            <Route path="/:agenda/contacts" element={<Contacts />}></Route>
            <Route path="/about-me" element={<AboutMe />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContactProvider>
  </StrictMode>,
)

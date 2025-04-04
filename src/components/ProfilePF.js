/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../assets/image/logo1.svg';
import ChangePassword from './ChangePassword';
import Confirmation from './Confirmation';

import api from '../services/api';

export default function ProfilePF() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [date, setDate] = useState('');
  const [cel, setCel] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCEP] = useState('');
  const [uf, setUF] = useState('');
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const [donorIsPresent, setDonorIsPresent] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api.get('/donors/profile').then((response) => {
      const donor = response.data;

      if (donor) {
        setDonorIsPresent(true);
        setName(donor.name);
        setCPF(donor.cpf);
        setDate(donor.date_of_birth);
        setCel(donor.cell_phone);
        setPhone(donor.telephone);
        setEmail(donor.email);
        setCEP(donor.zip_code);
        setUF(donor.state);
        setCountry(donor.city);
        setStreet(donor.address);
        setNumber(donor.number);
        setComplement(donor.complement);
      }
    });
  }, []);

  function openModal(e) {
    e.preventDefault();
    setShowModal(true);
    document.querySelector('body').classList.toggle('hideScroll');
  }

  function closeModal(e) {
    if (e) e.preventDefault();
    setShowModal(false);
    document.querySelector('body').classList.toggle('hideScroll');
  }

  function openConfirmation(e) {
    setShowConfirmation(true);
    document.querySelector('body').classList.toggle('hideScroll');
  }

  function closeConfirmation(e) {
    if (e) e.preventDefault();
    setShowConfirmation(false);
    document.querySelector('body').classList.toggle('hideScroll');
  }

  async function handleProfilePF(e) {
    e.preventDefault();

    const data = {
      name,
      cpf,
      cell_phone: cel,
      telephone: phone,
      email,
      state: uf,
      city: country,
      address: street,
      zip_code: cep,
      number,
      complement,
      date_of_birth: date,
    };

    try {
      if (!donorIsPresent) {
        await api.post('/donors', data);
      } else {
        await api.put('/donors', data);
      }
    } catch (err) {
      alert('Error in registration, try again!');
    }
    openConfirmation();
  }

  return (
    <div className="profile">
      <ChangePassword show={showModal} close={closeModal} />
      <div className="profile_content">
        <Confirmation show={showConfirmation} close={closeConfirmation} />
        <section className="profile_content-zone1">
          <img src={logo} alt="logo icósocial" />
          <h3>Meu Perfil</h3>
          <a href="#" className="password" onClick={openModal}>
            Alterar minha senha
          </a>

          <div className="back">
            <Link className="back_to" to="/dashboard">
              <FiArrowLeft size={20} color="#B537FF" />
              Voltar para Dashboard
            </Link>
          </div>
        </section>
        <section className="profile_content-zone2">
          <form
            className="profile_content-zone2-form1"
            onSubmit={handleProfilePF}
          >
            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="profile_content-zone2-form1-1">
              <input
                className="profile_content-zone2-form1-1-1"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />
              <input
                className="profile_content-zone2-form1-1-2"
                placeholder="Data de nascimento"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="profile_content-zone2-form1-1">
              <input
                className="profile_content-zone2-form1-1-3"
                placeholder="Celular"
                value={cel}
                onChange={(e) => setCel(e.target.value)}
              />
              <input
                className="profile_content-zone2-form1-1-4"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="profile_content-zone2-form1-1">
              <input
                className="profile_content-zone2-form1-1-1"
                type="Email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="profile_content-zone2-form1-1-2"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCEP(e.target.value)}
              />
            </div>

            <div className="profile_content-zone2-form1-1">
              <input
                className="profile_content-zone2-form1-1-5"
                placeholder="UF"
                value={uf}
                onChange={(e) => setUF(e.target.value)}
              />
              <input
                className="profile_content-zone2-form1-1-6"
                placeholder="Cidade"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <input
              placeholder="Logradouro"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <div className="profile_content-zone2-form1-1">
              <input
                className="profile_content-zone2-form1-1-5"
                placeholder="Numero"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <input
                className="profile_content-zone2-form1-1-6"
                placeholder="Complemento"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>
          </form>
          <form
            className="profile_content-zone2-form2"
            onSubmit={handleProfilePF}
          >
            <button className="button" type="submit">
              Salvar
            </button>
            <Link to="/dashboard">
              <FiArrowLeft size={20} color="#B537FF" />
              Voltar para Dashboard
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}

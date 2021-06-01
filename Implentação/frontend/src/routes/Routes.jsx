import React, { lazy, Suspense} from 'react';

import { BrowserRouter, Route } from 'react-router-dom';


const Alunos = lazy(() => import('../pages/Alunos'));
const AlunosRegister = lazy(() => import('../pages/AlunosRegister'));
const Professores = lazy(() => import('../pages/Professores'));
const ProfessoresRegister = lazy(() => import('../pages/ProfessoresRegister'));
const Empresas = lazy(() => import('../pages/Empresas'));
const EmpresasRegister = lazy(() => import('../pages/EmpresasRegister'));
const Vantagens = lazy(() => import('../pages/Vantagens'));
const VantagensRegister = lazy(() => import('../pages/VantagensRegister'));
const Login = lazy(() => import('../pages/Login'));
const Saldo = lazy(() => import('../pages/Saldo'));

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={() => <div>LOADING...</div>}>
        <Route exact path="/registrar/alunos" component={AlunosRegister} />
        <Route exact path="/vizualizar/alunos" component={Alunos} />
        <Route exact path="/registrar/empresas" component={EmpresasRegister} />
        <Route exact path="/vizualizar/empresas" component={Empresas} />
        <Route exact path="/registrar/professores" component={ProfessoresRegister} />
        <Route exact path="/vizualizar/professores" component={Professores} />
        <Route exact path="/registrar/vantagens" component={VantagensRegister} />
        <Route exact path="/vizualizar/vantagens" component={Vantagens} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/saldo" component={Saldo} />
      </Suspense>
    </BrowserRouter>
  );
}

export default Routes;
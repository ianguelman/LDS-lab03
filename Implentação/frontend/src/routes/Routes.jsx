import React, { lazy, Suspense} from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

const Alunos = lazy(() => import('../pages/Alunos'));
const AlunosRegister = lazy(() => import('../pages/AlunosRegister'));

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={() => <div>LOADING...</div>}>
        <Route exact path="/registrar/alunos" component={AlunosRegister} />
        <Route exact path="/vizualizar/alunos" component={Alunos} />
      </Suspense>
    </BrowserRouter>
  );
}

export default Routes;
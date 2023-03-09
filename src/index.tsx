import * as eva from '@eva-design/eva';
import React from 'react';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json';
// import { default as mapping } from './mapping.json'; // <-- Import app mapping
import GlobalContext from './context';
import { AppNavigation } from './navigation';

const App = () => (
  <>
    <GlobalContext>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <AppNavigation />
      </ApplicationProvider>
    </GlobalContext>
  </>
);

export default App;

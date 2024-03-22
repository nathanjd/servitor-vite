import { createContext } from 'react';
import { armyService } from '../lib/army-service';

// Default armyService will not reactively update.
export const ArmyServiceContext = createContext(armyService);

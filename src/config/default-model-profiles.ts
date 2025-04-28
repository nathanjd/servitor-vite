import { ModelProfile } from '../lib/profiles/model-profile';

export const guardsmen: ModelProfile = {
    name            : 'Guardsmen',
    move            : 6,
    toughness       : 3,
    armorSave       : 5,
    invulnerableSave: 7,
    wounds          : 1,
    leadership      : 7,
    objectiveControl: 2,
    keywords        : ['infantry'],
};

export const spaceMarine: ModelProfile = {
    name            : 'Space Marine',
    move            : 6,
    toughness       : 4,
    armorSave       : 3,
    invulnerableSave: 7,
    wounds          : 2,
    leadership      : 6,
    objectiveControl: 2,
    keywords        : ['infantry'],
};

export const terminator: ModelProfile = {
    name            : 'Terminator',
    move            : 5,
    toughness       : 5,
    armorSave       : 2,
    invulnerableSave: 4,
    wounds          : 3,
    leadership      : 6,
    objectiveControl: 1,
    keywords        : ['infantry'],
};

export const sentinel: ModelProfile = {
    name            : 'Sentinel',
    move            : 10,
    toughness       : 7,
    armorSave       : 3,
    invulnerableSave: 7,
    wounds          : 7,
    leadership      : 7,
    objectiveControl: 2,
    keywords        : ['vehicle', 'walker', 'smoke'],
};

export const dreadnaught: ModelProfile = {
    name            : 'Dreadnaught',
    move            : 6,
    toughness       : 9,
    armorSave       : 2,
    invulnerableSave: 7,
    wounds          : 8,
    leadership      : 6,
    objectiveControl: 3,
    keywords        : ['vehicle', 'walker', 'smoke'],
};

export const trukk: ModelProfile = {
    name            : 'Trukk',
    move            : 12,
    toughness       : 8,
    armorSave       : 4,
    invulnerableSave: 6,
    wounds          : 10,
    leadership      : 6,
    objectiveControl: 2,
    keywords        : ['vehicle', 'smoke'],
};

export const rhino: ModelProfile = {
    name            : 'Rhino',
    move            : 12,
    toughness       : 9,
    armorSave       : 3,
    invulnerableSave: 7,
    wounds          : 10,
    leadership      : 6,
    objectiveControl: 2,
    keywords        : ['vehicle', 'smoke'],
};

export const predator: ModelProfile = {
    name            : 'Predator',
    move            : 10,
    toughness       : 10,
    armorSave       : 3,
    invulnerableSave: 7,
    wounds          : 11,
    leadership      : 6,
    objectiveControl: 3,
    keywords        : ['vehicle', 'smoke'],
};

export const landRaider: ModelProfile = {
    name            : 'Land Raider',
    move            : 10,
    toughness       : 12,
    armorSave       : 2,
    invulnerableSave: 7,
    wounds          : 16,
    leadership      : 6,
    objectiveControl: 5,
    keywords        : ['vehicle', 'smoke'],
};

export const knight: ModelProfile = {
    name            : 'Imperial Knight',
    move            : 10,
    toughness       : 12,
    armorSave       : 3,
    invulnerableSave: 5,
    wounds          : 22,
    leadership      : 6,
    objectiveControl: 10,
    keywords        : ['vehicle', 'walker', 'titanic', 'towering'],
};

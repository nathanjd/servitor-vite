import { WeaponProfile } from '../lib/stats/mean-weapon-roll';

export const laspistol: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 3,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['pistol'],
};

export const lasgun: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 3,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['rapid fire 1'],
};

export const boltPistol: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['pistol'],
};

export const boltgun: WeaponProfile = {
    range           : 24,
    attacks         : '2',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : [],
};

export const combiBolter: WeaponProfile = {
    range           : 24,
    attacks         : '2',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['rapid fire 2'],
};

export const combiWeapon: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : [
        'anti-infantry 4+',
        'devastating wounds',
        'rapid fire 1',
    ],
};

export const flamer: WeaponProfile = {
    range           : 12,
    attacks         : 'd6',
    hitSkill        : -Infinity,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['ignores cover', 'torrent'],
};

export const plasmaPistol: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['pistol'],
};

export const plasmaPistolSupercharge: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['devastating wounds', 'hazardous', 'pistol'],
};

export const plasmaGun: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['rapid fire 1'],
};

export const plasmaGunSupercharge: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['devastating wounds', 'hazardous', 'rapid fire 1'],
};

export const autocannon: WeaponProfile = {
    range           : 48,
    attacks         : '2',
    hitSkill        : 4,
    strength        : 9,
    armorPenetration: 1,
    damage          : '3',
    keywords        : ['heavy'],
};

export const lascannon: WeaponProfile = {
    range           : 48,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 12,
    armorPenetration: 3,
    damage          : 'd6+1',
    keywords        : ['heavy'],
};

import { WeaponProfile } from '../lib/stats/mean-weapon-roll';

export const lightPistol: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 3,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['pistol'],
};

export const lightRifle: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 3,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['rapid fire 1'],
};

export const heavyPistol: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['pistol'],
};

export const heavyRifle: WeaponProfile = {
    range           : 24,
    attacks         : '2',
    hitSkill        : 3,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : [],
};

export const antiInfantryRifle: WeaponProfile = {
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

export const flamethrower: WeaponProfile = {
    range           : 12,
    attacks         : 'd6',
    hitSkill        : 7,
    strength        : 4,
    armorPenetration: 0,
    damage          : '1',
    keywords        : ['ignores cover', 'torrent'],
};

export const elitePistol: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['pistol'],
};

export const elitePistolOvercharge: WeaponProfile = {
    range           : 12,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['devastating wounds', 'hazardous', 'pistol'],
};

export const eliteRifle: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['rapid fire 1'],
};

export const eliteRifleOvercharge: WeaponProfile = {
    range           : 24,
    attacks         : '1',
    hitSkill        : 3,
    strength        : 7,
    armorPenetration: 2,
    damage          : '1',
    keywords        : ['devastating wounds', 'hazardous', 'rapid fire 1'],
};

export const antiMaterialRifle: WeaponProfile = {
    range           : 48,
    attacks         : '2',
    hitSkill        : 4,
    strength        : 9,
    armorPenetration: 1,
    damage          : '3',
    keywords        : ['heavy'],
};

export const beamRifle: WeaponProfile = {
    range           : 48,
    attacks         : '1',
    hitSkill        : 4,
    strength        : 12,
    armorPenetration: 3,
    damage          : 'd6+1',
    keywords        : ['heavy'],
};

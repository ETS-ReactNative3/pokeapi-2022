export const dataCategories = {
  abilities: {
    options: { useUrlIndex: false },
    category: 'abilities',
    localKey: 'abilitiesData',
    transformationKeys: [
      {
        key: 'id',
        transformation: null,
      },
      {
        key: 'name',
        transformation: null,
      },
      {
        key: 'effect_changes',
        transformation: (value, urlIndex) => {
          return value.length > 0
            ? value.map((el) => {
                return {
                  effect: el.effect_entries.filter(
                    (el) => el.language.name == 'en'
                  )[0]?.effect,
                }
              })
            : //  maybe shrink to first entry only, later
              []
        },
      },
      {
        key: 'effect_entries',
        transformation: (value, urlIndex) => {
          return {
            effect: value
              ? value.filter((el) => {
                  return el.language.name == 'en'
                })[0]?.effect
              : {},
            short_effect: value
              ? value.filter((el) => {
                  return el.language.name == 'en'
                })[0]?.short_effect
              : {},
          }
        },
      },
      {
        key: 'flavor_text_entries',
        transformation: (value, urlIndex) => {
          return {
            text: value
              ? value.filter((el) => {
                  return el.language.name == 'en'
                })[0]?.flavor_text
              : {},
          }
        },
      },
      {
        key: 'pokemon',
        transformation: (value, urlIndex, urlLimit) => {
          return value.filter((el, i) => {
            const regex = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)/
            const match = el.pokemon.url.match(regex)
            return match ? parseInt(match[1]) <= urlLimit : false
          })
        },
      },
    ],
  },
  moves: {
    options: { useUrlIndex: false },
    category: 'moves',
    localKey: 'movesData',
    transformationKeys: [
      {
        key: 'id',
        transformation: null,
      },
      {
        key: 'name',
        transformation: null,
      },
      {
        key: 'pp',
        transformation: null,
      },
      {
        key: 'power',
        transformation: null,
      },
      {
        key: 'stat_changes',
        transformation: null,
      },
      {
        key: 'effect_changes',
        transformation: null,
      },
      {
        key: 'damage_class',
        transformation: (value) => {
          return {
            name: value.name,
          }
        },
      },
      {
        key: 'learned_by_pokemon',
        transformation: (value, urlIndex, urlLimit) => {
          return value.filter((el, i) => {
            const regex = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)/
            const match = el.url.match(regex)
            return match ? parseInt(match[1]) <= urlLimit : false
          })
        },
      },
      {
        key: 'effect_entries',
        transformation: (value, urlIndex) => {
          return {
            effect: value
              ? value.filter((el) => {
                  return el.language.name == 'en'
                })[0]?.effect
              : {},
            short_effect: value
              ? value.filter((el) => {
                  return el.language.name == 'en'
                })[0]?.short_effect
              : {},
          }
        },
      },
      {
        key: 'flavor_text_entries',
        transformation: (value, urlIndex) => {
          return {
            text: value
              ? value.filter((el) => {
                  return el.language.name == 'en'
                })[0]?.flavor_text
              : {},
          }
        },
      },
    ],
  },
  items: {
    options: { useUrlIndex: false },
    category: 'items',
    localKey: 'itemsData',
    transformationKeys: [
      {
        key: 'id',
        transformation: null,
      },
      {
        key: 'name',
        transformation: null,
      },
      {
        key: 'effect_changes',
        transformation: () => {},
      },
      {
        key: 'effect_entries',
        transformation: () => {},
      },
      {
        key: 'flavor_text_entries',
        transformation: () => {},
      },
      {
        key: 'pokemon',
        transformation: () => {},
      },
    ],
  },
  encounters: {
    options: { useUrlIndex: false },
    category: 'items',
    localKey: 'itemsData',
    transformationKeys: [
      {
        key: 'id',
        transformation: null,
      },
      {
        key: 'name',
        transformation: null,
      },
      {
        key: 'effect_changes',
        transformation: () => {},
      },
      {
        key: 'effect_entries',
        transformation: () => {},
      },
      {
        key: 'flavor_text_entries',
        transformation: () => {},
      },
      {
        key: 'pokemon',
        transformation: () => {},
      },
    ],
  },
}

export default dataCategories

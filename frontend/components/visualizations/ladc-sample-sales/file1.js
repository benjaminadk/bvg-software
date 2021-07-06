// https://observablehq.com/@benjaminadk/ladc-sample-sales@445
import define1 from './file2.js'

export default function define(runtime, observer) {
  const main = runtime.module()
  main.variable(observer()).define(['md'], function (md) {
    return md`
# LADC Sample Sales Q1-2 2021

Inspired by [@unkleho/covid-19-bubble-chart-with-d3-render](https://observablehq.com/@unkleho/covid-19-bubble-chart-with-d3-render)

Use Modifactions of [@unkleho/checkbox-with-color-key](https://observablehq.com/@unkleho/checkbox-with-color-key) and [@jashkenas/inputs](https://observablehq.com/@jashkenas/inputs)`
  })
  main
    .variable(observer('bubbleChart'))
    .define(
      'bubbleChart',
      ['d3', 'width', 'height', 'renderBubbleChart', 'data', 'groupBy', 'brands'],
      function (d3, width, height, renderBubbleChart, data, groupBy, brands) {
        const svg = d3
          .create('svg')
          .attr('id', 'bubble-chart')
          .attr('viewBox', [0, 0, width, height])
          .attr('font-size', 8)
          .attr('font-weight', 'bold')
          .attr('font-family', 'sans-serif')
          .attr('text-anchor', 'middle')
          .style('position', 'relative')

        renderBubbleChart(svg, data)

        svg
          .selectAll('g')
          .append('title')
          .text((d) => {
            let node = data.find((el) => el.id === d.id)
            let manf =
              groupBy === 'brand' ? brands.find((el) => el.abbr === d.id)['manf'] : node.name
            if (groupBy === 'brand') {
              return `Brand: ${node.name}
Manufacturer: ${manf}
Samples: ${node.value}
Value: $${node.value * 5}`
            } else {
              return `Manufacturer: ${manf}
Samples: ${node.value}
Value: $${node.value * 5}`
            }
          })

        return svg.node()
      }
    )
  main.variable(observer('viewof groupBy')).define('viewof groupBy', ['radio'], function (radio) {
    return radio({
      title: 'Group By',
      options: [
        { label: 'Brand', value: 'brand' },
        { label: 'Manufacturer', value: 'manufacturer' },
      ],
      value: 'brand',
    })
  })
  main
    .variable(observer('groupBy'))
    .define('groupBy', ['Generators', 'viewof groupBy'], (G, _) => G.input(_))
  main
    .variable(observer('viewof selectedManufacturers'))
    .define(
      'viewof selectedManufacturers',
      ['checkbox', 'manufacturers'],
      function (checkbox, manufacturers) {
        return checkbox({
          title: 'Manufacturers',
          options: manufacturers.map((c) => {
            return {
              label: c.name,
              value: c.name,
              color: c.fill,
            }
          }),
          value: manufacturers.map((c) => c.name),
        })
      }
    )
  main
    .variable(observer('selectedManufacturers'))
    .define('selectedManufacturers', ['Generators', 'viewof selectedManufacturers'], (G, _) =>
      G.input(_)
    )
  main.variable(observer()).define(['md'], function (md) {
    return md`
### Components`
  })
  main.variable(observer('circleComponent')).define('circleComponent', function () {
    return ({ key, r, cx, cy, fill, randomDelay = Math.random() * 300 }) => {
      return {
        append: 'circle',
        key,
        r: { enter: r, exit: 0 },
        cx,
        cy,
        fill,
        duration: 1000,
        delay: randomDelay,
      }
    }
  })
  main.variable(observer('textComponent')).define('textComponent', function () {
    return ({
      key,
      text,
      x = 0,
      y = 0,
      fontWeight = 'bold',
      fontSize = '8px',
      textAnchor = 'middle',
      fillOpacity = 1,
      color,
      r,
      duration = 1000,
    }) => {
      return {
        append: 'text',
        key,
        text,
        x,
        y,
        textAnchor,
        fontFamily: 'sans-serif',
        fontWeight,
        fontSize,
        fillOpacity: { enter: fillOpacity, exit: 0 },
        fill: color,
        duration,
        style: {
          pointerEvents: 'none',
        },
      }
    }
  })
  main
    .variable(observer('labelComponent'))
    .define('labelComponent', ['textComponent', 'format'], function (textComponent, format) {
      return ({ brandAbbr, brandName, value, r, color }) => {
        if (r < 10) {
          return []
        }

        const circleWidth = r * 2
        const nameWidth = brandName.length * 12
        const shouldShowAbbr = nameWidth > circleWidth
        const newBrandName = shouldShowAbbr ? brandAbbr : brandName
        const shouldShowValue = r > 16

        let nameFontSize

        if (shouldShowValue) {
          nameFontSize = shouldShowAbbr ? '10px' : '12px'
        } else {
          nameFontSize = '8px'
        }

        return [
          textComponent({
            key: brandAbbr,
            text: newBrandName,
            fontSize: nameFontSize,
            y: shouldShowValue ? '-0.2em' : '0.3em',
            fillOpacity: 1,
            color,
          }),
          ...(shouldShowValue
            ? [
                textComponent({
                  key: brandAbbr,
                  text: format(value),
                  fontSize: '10px',
                  y: shouldShowAbbr ? '0.9em' : '1.0em',
                  fillOpacity: 0.8,
                  color,
                }),
              ]
            : []),
        ]
      }
    })
  main
    .variable(observer('bubbleComponent'))
    .define(
      'bubbleComponent',
      ['width', 'height', 'circleComponent', 'labelComponent'],
      function (width, height, circleComponent, labelComponent) {
        return ({ name, id, value, r, x, y, fill, color, duration = 1000 }) => {
          return {
            append: 'g',
            key: id,
            id: id,
            transform: {
              enter: `translate(${x + 1},${y + 1})`,
              exit: `translate(${width / 2},${height / 2})`,
            },
            duration,
            delay: Math.random() * 300,
            children: [
              circleComponent({ key: id, r, fill, duration }),
              ...labelComponent({
                brandAbbr: id,
                brandName: name,
                isoCode: id,
                value,
                r,
                color,
                duration,
              }),
            ],
          }
        }
      }
    )
  main.variable(observer()).define(['md'], function (md) {
    return md`
### Helpers`
  })
  main
    .variable(observer('renderBubbleChart'))
    .define(
      'renderBubbleChart',
      ['pack', 'bubbleComponent', 'render'],
      function (pack, bubbleComponent, render) {
        return (selection, data) => {
          const root = pack(data)

          const renderData = root.leaves().map((d) => {
            return bubbleComponent({
              id: d.data.id,
              name: d.data.name,
              value: d.data.value,
              r: d.r,
              x: d.x,
              y: d.y,
              fill: d.data.fill,
              color: d.data.color,
            })
          })

          return render(selection, renderData)
        }
      }
    )
  main
    .variable(observer('pack'))
    .define('pack', ['d3', 'width', 'height'], function (d3, width, height) {
      return (data) =>
        d3
          .pack()
          .size([width - 2, height - 2])
          .padding(2)(d3.hierarchy({ children: data }).sum((d) => d.value))
    })
  main.variable(observer('format')).define('format', ['d3'], function (d3) {
    return (value) => {
      const newValue = d3.format('0.2s')(value)

      if (newValue.indexOf('m') > -1) {
        return parseInt(newValue.replace('m', '')) / 1000
      }

      return newValue
    }
  })
  main.variable(observer()).define(['md'], function (md) {
    return md`
### Data`
  })
  main.variable(observer('data')).define('data', ['getDataBy'], function (getDataBy) {
    return getDataBy({})
  })
  main
    .variable(observer('getDataBy'))
    .define(
      'getDataBy',
      ['sampleData', 'selectedManufacturers', 'groupBy', 'colors', 'textColors'],
      function (sampleData, selectedManufacturers, groupBy, colors, textColors) {
        return function getDataBy({}) {
          return sampleData
            .filter((d) => {
              if (selectedManufacturers.length === 10) {
                return true
              } else {
                return selectedManufacturers.includes(d.manf)
              }
            })
            .map((d) => {
              let name = groupBy === 'brand' ? d.brand : d.manf
              return {
                name,
                id: d.id,
                value: d.samples,
                fill: colors[d.manf],
                color: textColors[d.manf],
              }
            })
            .sort(function (a, b) {
              return -1 * (a.value - b.value)
            })
        }
      }
    )
  main
    .variable(observer('sampleData'))
    .define(
      'sampleData',
      ['d3', 'brands', 'groupBy', 'manufacturers'],
      async function (d3, brands, groupBy, manufacturers) {
        const data = []
        // const raw = await FileAttachment("data.csv").csv()
        const raw = await d3.csv(
          'https://gist.githubusercontent.com/benjaminadk/cafbad398de0a1f8c49a5446f417beb1/raw/7c61ae88021f37a972961a4071dc62b309f7c018/ladc-sample-sales.csv'
        )

        for (let r of Array.from(raw)) {
          for (let b of brands) {
            let mod = groupBy === 'brand' ? b.name : b.manf
            if (r.name.startsWith(b.short)) {
              if (data.find((el) => el.brand === mod)) {
                data.find((el) => el.brand === mod)['samples'] += 1
              } else {
                let id =
                  groupBy === 'brand'
                    ? b.abbr
                    : manufacturers.find((el) => el.name === b.manf)['id']
                data.push({ id, brand: mod, manf: b.manf, samples: 1 })
              }
            }
          }
        }

        return data
      }
    )
  main.variable(observer('brands')).define('brands', function () {
    return [
      { abbr: 'SCH', short: 'Schumacher', name: 'Schumacher', manf: 'Schumacher' },
      { abbr: 'KRA', short: 'Kravet', name: 'Kravet', manf: 'Kravet' },
      { abbr: 'BRU', short: 'Brunschwig', name: 'Brunschwig & Fils', manf: 'Kravet' },
      { abbr: 'LEE', short: 'Lee Jofa', name: 'Lee Jofa', manf: 'Kravet' },
      { abbr: 'GPJ', short: 'GP', name: 'GP & J Baker', manf: 'Kravet' },
      { abbr: 'WT', short: 'Winfield', name: 'Winfield Thybony', manf: 'Kravet' },
      { abbr: 'AM', short: 'Andrew Martin', name: 'Andrew Martin', manf: 'Kravet' },
      { abbr: 'CS', short: 'Cole', name: 'Cole & Son', manf: 'Kravet' },
      { abbr: 'THR', short: 'Threads', name: 'Threads', manf: 'Kravet' },
      { abbr: 'CAC', short: 'Clarke', name: 'Clarke & Clarke', manf: 'Kravet' },
      { abbr: 'GWS', short: 'Groundworks', name: 'Groundworks', manf: 'Kravet' },
      { abbr: 'BLS', short: 'Baker Lifestyle', name: 'Baker Lifestyle', manf: 'Kravet' },
      { abbr: 'MBH', short: 'Mulberry', name: 'Mulberry Home', manf: 'Kravet' },
      { abbr: 'GYD', short: 'Gaston', name: 'Gaston Y Daniela', manf: 'Kravet' },
      { abbr: 'LA', short: 'Laura Ashley', name: 'Laura Ashley', manf: 'Kravet' },
      { abbr: 'PTX', short: 'Parkertex', name: 'Parkertex', manf: 'Kravet' },
      { abbr: 'GAP', short: 'Galbraith', name: 'Galbraith & Paul', manf: 'Thomas Lavin' },
      { abbr: 'CFR', short: 'Christopher Farr', name: 'Christopher Farr', manf: 'Thomas Lavin' },
      { abbr: 'OPU', short: 'Opuzen', name: 'Opuzen', manf: 'Thomas Lavin' },
      { abbr: 'CAL', short: 'Calvin', name: 'Calvin', manf: 'Thomas Lavin' },
      { abbr: 'MYR', short: 'Maya Romanoff', name: 'Maya Romanoff', manf: 'Thomas Lavin' },
      { abbr: 'CMN', short: 'Castel Maison', name: 'Castel Maison', manf: 'Thomas Lavin' },
      { abbr: 'MAR', short: 'Marvic', name: 'Marvic', manf: 'Thomas Lavin' },
      { abbr: 'SCA', short: 'Scalamandre', name: 'Scalamandre', manf: 'Scalamandre' },
      { abbr: 'NIC', short: 'Nicolette Mayer', name: 'Nicolette Mayer', manf: 'Scalamandre' },
      { abbr: 'OWW', short: 'Old World Weavers', name: 'Old World Weavers', manf: 'Scalamandre' },
      { abbr: 'LEL', short: 'Lelievre', name: 'Lelievre', manf: 'Scalamandre' },
      {
        abbr: 'CFB',
        short: 'Christian Fischbacher',
        name: 'Christian Fischbacher',
        manf: 'Scalamandre',
      },
      { abbr: 'ALD', short: 'Aldeco', name: 'Aldeco', manf: 'Scalamandre' },
      { abbr: 'ALH', short: 'Alhambra', name: 'Alhambra', manf: 'Scalamandre' },
      { abbr: 'TAC', short: 'Tassinari', name: 'Tassinari & Chatel', manf: 'Scalamandre' },
      { abbr: 'GRW', short: 'Grey Watkins', name: 'Grey Watkins', manf: 'Scalamandre' },
      { abbr: 'SBG', short: 'Sandberg', name: 'Sandberg', manf: 'Scalamandre' },
      { abbr: 'JPG', short: 'Jean Paul', name: 'Jean Paul Gaultier', manf: 'Scalamandre' },
      { abbr: 'COL', short: 'Colony', name: 'Colony', manf: 'Scalamandre' },
      { abbr: 'MSH', short: 'Missoni Home', name: 'Missoni Home', manf: 'Scalamandre' },
      { abbr: 'BKR', short: 'Boris Kroll', name: 'Boris Kroll', manf: 'Scalamandre' },
      { abbr: 'HIN', short: 'Hinson', name: 'Hinson', manf: 'Scalamandre' },
      { abbr: 'FAC', short: 'Fabricut', name: 'Fabricut', manf: 'Fabricut' },
      { abbr: 'TRD', short: 'Trend', name: 'Trend', manf: 'Fabricut' },
      { abbr: 'VER', short: 'Vervain', name: 'Vervain', manf: 'Fabricut' },
      { abbr: 'STM', short: 'Stroheim', name: 'Stroheim', manf: 'Fabricut' },
      { abbr: 'SHS', short: 'S. Harris', name: 'S. Harris', manf: 'Fabricut' },
      { abbr: 'PRD', short: 'Peter Dunham', name: 'Peter Dunham', manf: 'Independent' },
      { abbr: 'RL', short: 'Ralph Lauren', name: 'Ralph Lauren', manf: 'Independent' },
      { abbr: 'RAF', short: 'Robert Allen', name: 'Robert Allen', manf: 'Robert Allen' },
      { abbr: 'SUB', short: 'Suburban Home', name: 'Suburban Home', manf: 'Robert Allen' },
      { abbr: 'DUR', short: 'Duralee', name: 'Duralee', manf: 'Robert Allen' },
      { abbr: 'HDC', short: 'Highland Court', name: 'Highland Court', manf: 'Robert Allen' },
      { abbr: 'BEH', short: 'Beacon Hill', name: 'Beacon Hill', manf: 'Robert Allen' },
      { abbr: 'BAG', short: 'Bailey', name: 'Bailey & Griffin', manf: 'Robert Allen' },
      { abbr: 'JSP', short: 'Jasper', name: 'Jasper', manf: 'Independent' },
      { abbr: 'TPL', short: 'Templeton', name: 'Templeton', manf: 'Independent' },
      { abbr: 'SEA', short: 'Seabrook', name: 'Seabrook', manf: 'Independent' },
      { abbr: 'OSL', short: 'Osborne', name: 'Osborne & Little', manf: 'Osborne & Little' },
      { abbr: 'DG', short: 'Designer', name: "Designer's Guild", manf: 'Osborne & Little' },
      { abbr: 'NC', short: 'Nina Campbell', name: 'Nina Campbell', manf: 'Osborne & Little' },
      { abbr: 'MW', short: 'Matthew', name: 'Matthew Williamson', manf: 'Osborne & Little' },
      { abbr: 'LOR', short: 'Lorca', name: 'Lorca', manf: 'Osborne & Little' },
      { abbr: 'AST', short: 'AST', name: 'AST', manf: 'Independent' },
      { abbr: 'WCT', short: 'Wallcoveting', name: 'Wallcoveting', manf: 'Independent' },
      { abbr: 'BH', short: 'Brenda Houston', name: 'Brenda Houston', manf: 'Independent' },
      { abbr: 'MAX', short: 'Maxwell', name: 'Maxwell', manf: 'Independent' },
      { abbr: 'TEL', short: 'Telefina', name: 'Telefina', manf: 'Independent' },
      { abbr: 'KAS', short: 'Kasmir', name: 'Kasmir', manf: 'Independent' },
      { abbr: 'CHA', short: 'Charlotte', name: 'Charlotte', manf: 'Independent' },
      { abbr: 'JF', short: 'JF', name: 'JF', manf: 'Independent' },
      { abbr: 'BRE', short: 'Brentano', name: 'Brentano', manf: 'Independent' },
      { abbr: 'VIC', short: 'Victoria', name: 'Victoria Hagan', manf: 'Independent' },
      { abbr: 'PFR', short: 'Pierre Frey', name: 'Pierre Frey', manf: 'Out House' },
      { abbr: 'THI', short: 'Thibaut', name: 'Thibaut', manf: 'Out House' },
      { abbr: 'ANT', short: 'Anthology', name: 'Anthology', manf: 'Sanderson Design' },
      { abbr: 'HAR', short: 'Harlequin', name: 'Harlequin', manf: 'Sanderson Design' },
      { abbr: 'MAC', short: 'Morris', name: 'Morris & Co.', manf: 'Sanderson Design' },
      { abbr: 'SAN', short: 'Sanderson', name: 'Sanderson', manf: 'Sanderson Design' },
      { abbr: 'SCI', short: 'Scion', name: 'Scion', manf: 'Sanderson Design' },
    ]
  })
  main.variable(observer('manufacturers')).define('manufacturers', ['colors'], function (colors) {
    return [
      {
        id: 'KF',
        name: 'Kravet',
        fill: colors['Kravet'],
      },
      {
        id: 'SCH',
        name: 'Schumacher',
        fill: colors['Schumacher'],
      },
      {
        id: 'SCA',
        name: 'Scalamandre',
        fill: colors['Scalamandre'],
      },
      {
        id: 'FAB',
        name: 'Fabricut',
        fill: colors['Fabricut'],
      },
      {
        id: 'SDG',
        name: 'Sanderson Design',
        fill: colors['Sanderson Design'],
      },
      {
        id: 'TL',
        name: 'Thomas Lavin',
        fill: colors['Thomas Lavin'],
      },
      {
        id: 'IND',
        name: 'Independent',
        fill: colors['Independent'],
      },
      {
        id: 'OL',
        name: 'Osborne & Little',
        fill: colors['Osborne & Little'],
      },
      {
        id: 'RAD',
        name: 'Robert Allen',
        fill: colors['Robert Allen'],
      },
      {
        id: 'OUT',
        name: 'Out House',
        fill: colors['Out House'],
      },
    ]
  })
  main.variable(observer('colors')).define('colors', function () {
    return {
      Kravet: '#fd7f2b',
      Schumacher: '#2f9bbc',
      Scalamandre: '#43c3c5',
      'Thomas Lavin': '#bdd6ca',
      'Osborne & Little': '#efdcc0',
      'Sanderson Design': '#ffa442',
      Independent: '#226089',
      'Robert Allen': '#fc5821',
      Fabricut: '#ea4337',
      'Out House': '#d74749',
    }
  })
  main.variable(observer('textColors')).define('textColors', function () {
    return {
      Kravet: '#ffffff',
      Schumacher: '#ffffff',
      Scalamandre: '#ffffff',
      'Thomas Lavin': '#333333',
      'Osborne & Little': '#333333',
      'Sanderson Design': '#ffffff',
      Independent: '#ffffff',
      'Robert Allen': '#ffffff',
      Fabricut: '#ffffff',
      'Out House': '#ffffff',
    }
  })
  main.variable(observer('height')).define('height', ['width'], function (width) {
    if (width > 450) {
      // console.log(screen);
      return 700
    }

    return width
  })
  main.variable(observer()).define(['md'], function (md) {
    return md`
### Dependencies`
  })
  const child1 = runtime.module(define1)
  main.import('radio', child1)
  main.import('checkbox', child1)
  main.variable(observer('d3Render')).define('d3Render', ['require'], function (require) {
    return require('d3-render@v0.2.4')
  })
  main.variable(observer('render')).define('render', ['d3Render'], function (d3Render) {
    return d3Render.default
  })
  main.variable(observer('d3')).define('d3', ['require'], function (require) {
    return require('d3@5')
  })
  return main
}

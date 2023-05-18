module.exports = {
  multipass: true,
  full: true,
  js2svg: {
    indent: 2,
    pretty: false
  },
  plugins: [
    'cleanupAttrs',
    'mergeStyles',
    'inlineStyles',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeXMLNS',
    'removeEmptyContainers',
    'removeViewBox',
    'cleanupEnableBackground',
    'minifyStyles',
    // 'convertStyleToAttrs',
    {
      name: 'convertColors',
      params: {
        shortname: false
      }
    },
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    // 'prefixIds',
    'cleanupIDs',
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 2
      }
    },
    'cleanupNumericValues',
    'cleanupListOfValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // 'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'convertEllipseToCircle',
    'sortAttrs',
    'sortDefsChildren',
    // 'removeDimensions',
    // 'removeAttrs',
    // 'removeAttributesBySelector',
    // 'removeElementsByAttr',
    // 'addClassesToSVGElement',
    // 'addAttributesToSVGElement',
    // 'removeOffCanvasPaths',
    // 'removeStyleElement',
    'removeScriptElement',
    // 'reusePaths'
  ]
}













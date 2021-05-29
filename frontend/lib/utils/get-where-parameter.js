function getWhereParameter(tags, tagLogic) {
  if (tags.includes('all posts')) {
    return {}
  } else {
    let filters = []
    for (let t of tags) {
      filters.push({ tags_contains: t })
    }
    return tagLogic === 'or' ? { _or: filters } : filters
  }
}

export default getWhereParameter

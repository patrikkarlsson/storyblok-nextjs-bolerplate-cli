import mediaquery from './mediaquery.js'
import spacing from './spacing.js'

const datasources = ({ storyblokApi }) => {

  const uploadEntries = (datasource_id, name, entries) => {
    const entriesPromises = []
    entries.forEach((entry) => {
      const payload = {
        datasource_entry: {
          ...entry,
          datasource_id,
        }
      }
      entriesPromises.push(storyblokApi.post('/datasource_entries', payload))
    })
    return Promise.all(entriesPromises)
      .then(() => {
        console.log(`Created datsources entries for: ${name}`)
      }).catch((err) => {
        console.log(err)
      })
  }

  const getDatasourcesFromStoryblok = async () => {
    let created_datasources = await storyblokApi.get('/datasources')
    return created_datasources.data.datasources.length > 0 ? created_datasources.data.datasources.map((datasource) => {
      return {
        id: datasource.id,
        slug: datasource.slug
      }
    }) : []
  }

  const generateStoryblokDatasourcePayload = (datasource) => {
    switch (datasource) {
      case 'Media Queries':
        return mediaquery
      case 'Spacing':
        return spacing
      default:
        return null
    }
  }

  const uploadDatasource = (datasource) => {
    return storyblokApi.post('/datasources', {
      datasource: {
        name: datasource.name,
        slug: datasource.slug,
      }
    }).then((res) => {
      if (res.status == 201) {
        return uploadEntries(res.data.datasource.id, datasource.name, datasource.entries)
      }
    })
  }

  const upload = (datasources) => {

    return getDatasourcesFromStoryblok()
      .then((datasourcesFromStoryblok) => {
        const datasourcesPromises = []
        datasources.forEach((datasource) => {
          const datasourcePayload = generateStoryblokDatasourcePayload(datasource)
          const datasourceExistsInStoryblok = datasourcesFromStoryblok.find((d) => d.slug == datasourcePayload.slug) != undefined
          if (datasourceExistsInStoryblok) {
            console.log(`Datasource already exists: ${datasourcePayload.slug}`)
            return
          }
          datasourcesPromises.push(uploadDatasource(datasourcePayload))
        })
        return Promise.all(datasourcesPromises)
      }).catch((err) => {
        console.log(err)
        console.log('Could not upload datasources')
      })
  }

  return {
    upload,
  }
}

export default datasources
import Metadata from "Database/migrations/1652273415526_metadata"
import Database from "@ioc:Adonis/Lucid/Database"
import Gallery from "App/Models/Gallery"

export default class GalleriesController {

  public async store ({ request }) {
    const { name, ipfs, traits } = request.body()

    const nftGallery = await Gallery.create({
      name,
      ipfs,
    })

    let nftGalleryId = await nftGallery['$attributes'].id

    let traitColumns: any = []
    let traitValues: any = []

    traits.map(async (trait) => {
      let column = trait.trait_type.replace(' ', '_').toLowerCase().toString()
      traitColumns.push(column)
      traitValues.push(trait.value)
    })

    await Database.rawQuery(
      `
        INSERT INTO metadata
        (nft_id,${traitColumns})
        VALUES
        (${nftGalleryId},${traitValues.map(trait => `'${trait}'`)})
      `
    )

    return 'success'
  }

  public async list () {
    const GalleyList = await Database.rawQuery(
      `
        SELECT *
        FROM galleries
        INNER JOIN metadata
        ON galleries.id = metadata.nft_id
        ORDER BY galleries.id
      `
    )

    return GalleyList.rows
  }

  public async updateMetadata ({ request }) {
    const { ipfs } = request.body()

    await Database
      .rawQuery(`UPDATE galleries SET ipfs = '${ipfs}'`)

    return 'success'
  }
}

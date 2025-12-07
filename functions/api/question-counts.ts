// @ts-ignore - Cloudflare Workers types
interface Env {
  DB: any // D1Database
}

interface SubCategoryCount {
  subCategory: string
  count: number
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  try {
    // Check if DB binding exists
    if (!context.env.DB) {
      return Response.json({
        success: false,
        error: 'D1 database binding not found'
      }, { status: 500 })
    }

    // Query to count questions by subcategory
    const query = `
      SELECT "domain_sub-category" as subCategory, COUNT(*) as count 
      FROM cards_v2 
      GROUP BY "domain_sub-category"
    `

    const { results } = await context.env.DB.prepare(query).all()

    // Convert to a map for easy lookup
    const countsMap: Record<string, number> = {}
    for (const row of results as SubCategoryCount[]) {
      countsMap[row.subCategory] = row.count
    }

    return Response.json({
      success: true,
      counts: countsMap
    })
  } catch (error) {
    console.error('Error fetching question counts:', error)
    return Response.json({
      success: false,
      error: 'Failed to fetch question counts',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

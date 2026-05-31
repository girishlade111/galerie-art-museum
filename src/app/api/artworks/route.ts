import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const movementId = searchParams.get('movementId');
    const artistId = searchParams.get('artistId');

    const where: Record<string, unknown> = {};
    if (featured === 'true') where.featured = true;
    if (movementId) where.movementId = movementId;
    if (artistId) where.artistId = artistId;

    const artworks = await db.artwork.findMany({
      where,
      include: {
        artist: true,
        movement: true,
      },
      orderBy: { year: 'asc' },
    });

    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json({ error: 'Failed to fetch artworks' }, { status: 500 });
  }
}

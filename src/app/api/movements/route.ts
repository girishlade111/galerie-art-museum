import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const movements = await db.artMovement.findMany({
      include: {
        _count: {
          select: { artworks: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(movements);
  } catch (error) {
    console.error('Error fetching movements:', error);
    return NextResponse.json({ error: 'Failed to fetch movements' }, { status: 500 });
  }
}

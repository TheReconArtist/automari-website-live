import { NextResponse } from 'next/server';
import { agentStub } from '@/lib/agentStub';
import { Email, EmailTone, AiDraftReply } from '@/lib/types';

export async function POST(req: Request) {
  const { email, tone, snippets }: { email: Email; tone: EmailTone; snippets: string[] } = await req.json();

  if (!email || !tone) {
    return NextResponse.json({ error: 'Email and tone are required' }, { status: 400 });
  }

  const draftReply: AiDraftReply = await agentStub.draftReply(email, tone, snippets || []);
  return NextResponse.json(draftReply);
}

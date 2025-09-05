import { NextResponse } from 'next/server';
import { agentStub } from '@/lib/agentStub';
import { Email, AiClassification } from '@/lib/types';

export async function POST(req: Request) {
  const { email }: { email: Email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email data is required' }, { status: 400 });
  }

  const classification: AiClassification = await agentStub.classify(email);
  return NextResponse.json(classification);
}

import { HabitPage } from "./HabitPage";

export default async function Page({
  params,
}: {
  params: Promise<{ habit: string }>;
}) {
  const habitId = (await params).habit;
  return <HabitPage habitId={habitId} />;
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function ExperienceDrawer({ experience, onClose }) {
  if (!experience) return null;

  return (
    <Sheet open={!!experience} onOpenChange={onClose}>
      <SheetContent className="w-150">
        <SheetHeader>
          <SheetTitle>Experience Detail</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4">
          <p>
            <strong>Company:</strong>
            {experience.companyId?.name}
          </p>

          <p>
            <strong>Role:</strong>
            {experience.role}
          </p>

          <p>
            <strong>Result:</strong>
            {experience.finalResult}
          </p>

          <div>
            <strong>Rounds:</strong>

            {experience.rounds.map((r, i) => (
              <div key={i} className="border p-3 rounded mt-2">
                <p>Type: {r.roundType}</p>
                <p>Difficulty: {r.difficultyRating}</p>

                <ul className="list-disc ml-5">
                  {r.questionsAsked.map((q, j) => (
                    <li key={j}>{q}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p>
            <strong>Advice:</strong>
            {experience.adviceForJuniors}
          </p>

          <p>
            <strong>Learnings:</strong>
            {experience.keyLearnings?.join(", ")}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

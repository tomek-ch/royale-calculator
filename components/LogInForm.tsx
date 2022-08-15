import { Button } from "./Button";
import { Input } from "./Input";

interface LogInFormProps {}

export const LogInForm = ({}: LogInFormProps) => {
  const error = "";

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex gap-2">
        <Input id="player-tag" placeholder="#XXXXXX" autoFocus />
        <Button variant="primary" className="ml-auto">
          Log in
        </Button>
      </div>
    </form>
  );
};

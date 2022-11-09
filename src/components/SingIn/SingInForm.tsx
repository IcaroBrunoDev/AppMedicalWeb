import React from "react";

import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner,
} from "reactstrap";

import { Credentials } from "../../interfaces/Sign";

import { useAuth } from "../../context/AuthProvider";

export default function SignForm() {
  const auth = useAuth();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [credentials, setCredentials] = React.useState<Credentials>({
    email: "",
    password: "",
  });

  const handleInput = (target: HTMLInputElement) => {
    const { name, value } = target;
    setCredentials((prev: any) => ({ ...prev, [name]: value }));
  };

  const authenticate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;

    if (email === "" || password === "") {
      return;
    }

    setLoading(true);

    const isSigned = await auth.authenticate({ email, password });

    setLoading(false);

    if (typeof isSigned === "boolean" && isSigned) {
      document.location.assign("/#/admin/agenda");
    }
  };

  return (
    <Form role="form" onSubmit={authenticate}>
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name="email"
            placeholder="Email *"
            type="email"
            autoComplete="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e.target)
            }
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name="password"
            placeholder="Senha *"
            type="password"
            autoComplete="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInput(e.target)
            }
          />
        </InputGroup>
      </FormGroup>
      <div className="text-center">
        <Button className="my-4" color="secondary" type="submit">
          {loading ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            "Entrar"
          )}
        </Button>
      </div>
    </Form>
  );
}

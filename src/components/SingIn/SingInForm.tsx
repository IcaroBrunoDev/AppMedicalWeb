import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Container,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import { Credentials } from "../../interfaces/Sign";

import api from "../../utils/axios";

import { storageProfile, storageSessionToken } from "../../utils/caches";
import {
  AlertType,
  AwaitedApiProfile,
  AwaitedApiToken,
} from "../../interfaces/General";
import { ExceptionMessages } from "../../utils/messages";
import { decodeExceptionObject } from "../../utils/helpers";
import axios from "../../utils/axios";

enum Provider {
  admin_nurse = "admin_nurse",
  specialized_doctor = "doctor",
}
export default function SignForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<Credentials>({
    authenticator: "",
    password: "",
  });

  const handleInput = (target: HTMLInputElement) => {
    const { name, value } = target;
    setCredentials((prev: any) => ({ ...prev, [name]: value }));
  };

  async function authenticate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { authenticator, password } = credentials;

    if (authenticator === "" || password === "") {
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post<AwaitedApiToken>("/signin", {
        login: authenticator,
        password,
        provider: Provider.specialized_doctor,
      });

      const { token } = data.response;

      storageSessionToken(data.response);

      const profile = await api.get<AwaitedApiProfile>("/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      storageProfile(profile.data.response);

      window.location.href = "/#/admin/agenda";
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  }

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
            name="authenticator"
            placeholder="Email *"
            type="email"
            autoComplete="authenticator"
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
            <Spinner animation="border" role="status" size="sm"></Spinner>
          ) : (
            "Entrar"
          )}
        </Button>
      </div>
    </Form>
  );
}

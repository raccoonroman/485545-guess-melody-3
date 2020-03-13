import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "./auth-screen.jsx";


it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <AuthScreen
        onReplayButtonClick={() => {}}
        onSubmit={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

import React, { useState } from "react";
import S from "./style";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <S.CheckboxWrapper onClick={() => setChecked(!checked)}>
      <img
        src={checked ? "/assets/icons/check-on.png" : "/assets/icons/check-off.png"}
        width={20}
        height={20}
        alt={checked ? "체크됨" : "체크안됨"}
      />
    </S.CheckboxWrapper>
  );
};

export default Checkbox;

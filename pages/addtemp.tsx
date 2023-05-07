import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
const PocketBase = require("pocketbase/cjs");
const pb = new PocketBase("https://tenderassist.pockethost.io");
pb.autoCancellation(false);

const AddTempPage: NextPage = () => {
  async function AddTemp() {
    const nametemp = tempfirstname.value;

    const data = {
      tempname: nametemp,
    };

    const record = await pb.collection("temps").create(data);

    document.getElementById("addtempreturn").innerHTML =
      "Successfuly added " + nametemp;
    document.getElementById("tempfirstname").value = "";
    window.location.reload;
  }

  return (
    <div>
      <div name="middle">
        <h1>"TenderAssist"</h1>
      </div>
      <nav>
        <ul>
          <Link href={"admin_home"}>
            <li>
              <div name="a">Home</div>
            </li>
          </Link>

          <li>
            <div name="a" class="active">Add Temps</div>
          </li>

          <Link href={"deletetemp"}>
            <li>
              <div name="a">Delete Temps</div>
            </li>
          </Link>

          <Link href={"addboxes"}>
            <li>
              <div name="a">Add Boxes/Specials</div>
            </li>
          </Link>

          <Link href={"deleteboxes"}>
            <li>
              <div name="a">Delete Boxes/Specials</div>
            </li>
          </Link>

          <Link href={"editoffices"}>
            <li>
              <div name="a">Add Offices</div>
            </li>
          </Link>

          <Link href={"login"}>
            <li>
              <div name="a">Switch to User Mode</div>
            </li>
          </Link>
        </ul>
      </nav>

      <div name="middle">
        <h2>Add Temp</h2>
        <p>Please enter the temps details below</p>
        <br />
        <label>Name: </label>
        <input
          type="text"
          id="tempfirstname"
          name="tempfirstname"
          placeholder="Enter First Name"
        />
        <br />

        <p name="feedback" id="addtempreturn"></p>

        <button id="btnAddTemp" onClick={AddTemp}>
          Add Temp
        </button>
      </div>
    </div>
  );
};

export default AddTempPage;

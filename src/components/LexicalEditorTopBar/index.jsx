import * as React from "react";
import { useState } from "react";
import "./index.css";
import { Divider, Grid } from "@mui/material";
import toolbarIconsList from "./toolbarIconsList";
import { Box } from "mdi-material-ui";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useOnClickListener from "./useOnClickListener";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "./FloatingLinkEditor";
import { InsertImageDialog } from "../CustomPlugins/ImagePlugin";
import { InsertVideoDialog } from "../CustomPlugins/VideosPlugin";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatHeader1 from "mdi-material-ui/FormatHeader1";
import FormatHeader2 from "mdi-material-ui/FormatHeader2";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatText from "mdi-material-ui/FormatText";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import VideoIcon from "@mui/icons-material/VideoLibrary"; // Replace with the actual import for your video icon

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatUnderline: "formatUnderline",
  formatStrike: "formatStrike",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  insertImage: "insertImage",
  insertVideo: "insertVideo",
};

const pluginsList = [
  {
    id: 1,
    Icon: FormatText,
    event: eventTypes.paragraph,
  },
  {
    id: 2,
    Icon: FormatHeader1,
    event: eventTypes.h1,
  },
  {
    id: 3,
    Icon: FormatHeader2,
    event: eventTypes.h2,
  },
  {
    id: 4,
    Icon: FormatListBulletedIcon,
    event: eventTypes.ul,
  },

  {
    id: 5,
    Icon: FormatListNumberedIcon,
    event: eventTypes.ol,
  },
  {
    id: 6,
    Icon: FormatQuoteIcon,
    event: eventTypes.quote,
  },

  {
    id: 7,
    Icon: CodeIcon,
    event: eventTypes.formatCode,
  },
  {
    id: 8,
    Icon: UndoOutlinedIcon,
    event: eventTypes.formatUndo,
  },
  {
    id: 9,
    Icon: RedoOutlinedIcon,
    event: eventTypes.formatRedo,
  },
  {
    id: 10,
    Icon: FormatBoldOutlinedIcon,
    event: eventTypes.formatBold,
  },
  {
    id: 11,
    Icon: FormatItalicOutlinedIcon,
    event: eventTypes.formatItalic,
  },
  {
    id: 12,
    Icon: FormatUnderlinedOutlinedIcon,
    event: eventTypes.formatUnderline,
  },
  // { // reactive it if you need it
  //   id: 13,
  //   Icon: StrikethroughSOutlinedIcon,
  //   event: eventTypes.formatStrike,
  // },
  {
    id: 13,
    Icon: ImageIcon,
    event: eventTypes.insertImage,
  },
  {
    id: 18,
    Icon: VideoIcon,
    event: eventTypes.insertVideo,
  },
  {
    id: 14,
    Icon: InsertLinkOutlinedIcon,
    event: eventTypes.formatInsertLink,
  },
  {
    id: 15,
    Icon: FormatAlignLeftOutlinedIcon,
    event: eventTypes.formatAlignLeft,
  },

  {
    id: 16,
    Icon: FormatAlignJustifyOutlinedIcon,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 17,
    Icon: FormatAlignRightOutlinedIcon,
    event: eventTypes.formatAlignRight,
  },
];

// export default pluginsList;

const LexicalEditorTopBar = () => {
  const [selectedIcons, setSelectedIcons] = useState([]);

  const handleClick = (eventType) => {
    // Toggle the selected state for the clicked icon
    setSelectedIcons((prevSelectedIcons) => {
      if (prevSelectedIcons.includes(eventType)) {
        return prevSelectedIcons.filter((icon) => icon !== eventType);
      } else {
        return [...prevSelectedIcons, eventType];
      }
    });

    // Call your onClick function here
    // onClick(eventType);
  };

  const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
    useOnClickListener();

  const isIconSelected = (plugin) =>
    selectedEventTypes.includes(plugin.event) ||
    blockType.includes(plugin.event);

  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Example: If 'h1' is selected, trigger onClick with eventTypes.h1
    if (selectedValue === "h1") {
      onClick(eventTypes.h1);
    } else if (selectedValue === "h2") {
      onClick(eventTypes.h2);
    } else if (selectedValue === "ul") {
      onClick(eventTypes.ul);
    } else if (selectedValue === "ol") {
      onClick(eventTypes.ol);
    } else if (selectedValue === "quote") {
      onClick(eventTypes.quote);
    } else if (selectedValue === "paragraph") {
      onClick(eventTypes.paragraph);
    } else if (selectedValue === "formatBold") {
      onClick(eventTypes.formatBold);
    }
  };

  return (
    <div className="inputContainer">
      {/* {pluginsList.map((plugin) => (
        <Grid
          key={plugin.id}
          sx={{
            cursor: "pointer",
          }}
          item
        >
          {
            <plugin.Icon
              sx={plugin.iconSx}
              onClick={() => onClick(plugin.event)}
              color={isIconSelected(plugin) ? "secondary" : undefined}
            />
          }
        </Grid>
      ))} */}
      <Grid
        container
        // justifyContent="sp"
        spacing={2}
        alignItems="center"
        sx={{
          background: "white",
          color: "gray",
          spacing: "2",
          fontSize: "25px",
          py: 1,
          px: 3,
        }}
      >
        <div
          style={{ PaddingLeft: "20px" }}
          className="d-flex justify-content-between w-100 pl-10 pt-3"
        >
          <div className="d-flex w-50 ">
            <div className="d-flex pl-8 ml-10">
              <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
                <FormatBoldOutlinedIcon
                  onClick={() => {
                    onClick(eventTypes.formatBold);
                    handleClick(eventTypes.formatBold);
                  }}
                  className={
                    selectedIcons.includes(eventTypes.formatBold)
                      ? "selected"
                      : ""
                  }
                />
              </Grid>

              <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
                <FormatItalicOutlinedIcon
                  onClick={() => {
                    onClick(eventTypes.formatItalic);
                    handleClick(eventTypes.formatItalic);
                  }}
                  className={
                    selectedIcons.includes(eventTypes.formatItalic)
                      ? "selected"
                      : ""
                  }
                />
              </Grid>

              <Grid
                item
                key={12}
                sx={{ cursor: "pointer", marginRight: "2px" }}
              >
                <FormatUnderlinedOutlinedIcon
                  onClick={() => {
                    onClick(eventTypes.formatUnderline);
                    handleClick(eventTypes.formatUnderline);
                  }}
                  className={
                    selectedIcons.includes(eventTypes.formatUnderline)
                      ? "selected"
                      : ""
                  }
                />
              </Grid>

              <Grid item sx={{ cursor: "pointer" }}>
                <CodeIcon
                  onClick={() => {
                    onClick(eventTypes.formatCode);
                    handleClick(eventTypes.formatCode);
                  }}
                  className={
                    selectedIcons.includes(eventTypes.formatCode)
                      ? "selected"
                      : ""
                  }
                />
              </Grid>
            </div>
            <br />
            <span className="px-3 ">|</span>

            <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
              <FormatAlignLeftOutlinedIcon
                onClick={() => {
                  onClick(eventTypes.formatAlignLeft);
                  handleClick(eventTypes.formatAlignLeft);
                }}
                className={
                  selectedIcons.includes(eventTypes.formatAlignLeft)
                    ? "selected"
                    : ""
                }
              />
            </Grid>

            <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
              <FormatAlignJustifyOutlinedIcon
                onClick={() => {
                  onClick(eventTypes.formatAlignCenter);
                  handleClick(eventTypes.formatAlignCenter);
                }}
                className={
                  selectedIcons.includes(eventTypes.formatAlignCenter)
                    ? "selected"
                    : ""
                }
              />
            </Grid>

            <Grid item sx={{ cursor: "pointer" }}>
              <FormatAlignRightOutlinedIcon
                onClick={() => {
                  onClick(eventTypes.formatAlignRight);
                  handleClick(eventTypes.formatAlignRight);
                }}
                className={
                  selectedIcons.includes(eventTypes.formatAlignRight)
                    ? "selected"
                    : ""
                }
              />
            </Grid>
            <span className="px-3 ">|</span>

            <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
              <InsertLinkOutlinedIcon
                onClick={() => {
                  onClick(eventTypes.formatInsertLink);
                  handleClick(eventTypes.formatInsertLink);
                }}
                className={
                  selectedIcons.includes(eventTypes.formatInsertLink)
                    ? "selected"
                    : ""
                }
              />
            </Grid>

            <span className="px-3 height-20 .fs-1 bold">|</span>

            <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
              <ImageIcon onClick={() => onClick(eventTypes.insertImage)} />
            </Grid>

            <Grid item sx={{ cursor: "pointer" }}>
              <VideoIcon
                onClick={() => onClick(eventTypes.insertVideo)} // Replace with your actual event type
              />
            </Grid>
            <span className="px-3 height-20 ">|</span>
            <FormControl sx={{ m: 0, minWidth: 130, border: 0, height: 40 }}>
              <Select
                className="border-0 bg-white"
                sx={{ border: 0, height: 40 }}
                value={selectedOption}
                onChange={handleChange}
                displayEmpty
                id="select"
              >
                <MenuItem value={eventTypes.paragraph}>
                  {" "}
                  <Grid item key={2} sx={{ cursor: "pointer" }}>
                    <button
                      className="bg-white border-0"
                      onClick={() => onClick(eventTypes.paragraph)}
                      color={
                        isIconSelected(eventTypes.paragraph)
                          ? "dark"
                          : undefined
                      }
                    >
                      Paragraph
                    </button>
                  </Grid>
                </MenuItem>
                <MenuItem value={eventTypes.h1}>
                  <Grid item key={2} sx={{ cursor: "pointer" }}>
                    <button
                      className="bg-white border-0"
                      onClick={() => onClick(eventTypes.h1)}
                      color={isIconSelected(eventTypes.h1) ? "dark" : undefined}
                    >
                      Heading 1
                    </button>
                  </Grid>
                </MenuItem>
                <MenuItem value={eventTypes.h2}>
                  <Grid item key={3} sx={{ cursor: "pointer" }}>
                    <button
                      className="bg-white border-0"
                      onClick={() => onClick(eventTypes.h2)}
                      color={isIconSelected(eventTypes.h2) ? "dark" : undefined}
                    >
                      Heading 2
                    </button>
                  </Grid>
                </MenuItem>
                <MenuItem value="ul">
                  <Grid item key={4} sx={{ cursor: "pointer" }}>
                    <button
                      className="bg-white border-0"
                      onClick={() => onClick(eventTypes.ul)}
                      color={isIconSelected(eventTypes.ul) ? "dark" : undefined}
                    >
                      Bullet List
                    </button>
                  </Grid>
                </MenuItem>
                <MenuItem value="ol">
                  <Grid item key={5} sx={{ cursor: "pointer" }}>
                    <button
                      className="bg-white border-0"
                      onClick={() => onClick(eventTypes.ol)}
                      color={isIconSelected(eventTypes.ol) ? "dark" : undefined}
                    >
                      Numbered List
                    </button>
                  </Grid>
                </MenuItem>
                <MenuItem value="quote">
                  <Grid item key={6} sx={{ cursor: "pointer" }}>
                    <button
                      className="bg-white border-0"
                      onClick={() => onClick(eventTypes.quote)}
                      color={
                        isIconSelected(eventTypes.quote) ? "dark" : undefined
                      }
                    >
                      Block Quotes
                    </button>
                  </Grid>
                </MenuItem>
              </Select>
            </FormControl>

            <span className="px-3 height-20 ">|</span>
          </div>
          <div className="d-flex">
            <Grid item sx={{ cursor: "pointer", marginRight: "2px" }}>
              <UndoOutlinedIcon
                onClick={() => onClick(eventTypes.formatUndo)}
                color={
                  isIconSelected(eventTypes.formatUndo)
                    ? "secondary"
                    : undefined
                }
              />
            </Grid>

            <Grid item sx={{ cursor: "pointer" }}>
              <RedoOutlinedIcon
                onClick={() => onClick(eventTypes.formatRedo)}
                color={
                  isIconSelected(eventTypes.formatRedo)
                    ? "secondary"
                    : undefined
                }
              />
            </Grid>
          </div>{" "}
        </div>

        {modal}
        {isLink &&
          createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
      </Grid>{" "}
    </div>
  );
};

export default LexicalEditorTopBar;

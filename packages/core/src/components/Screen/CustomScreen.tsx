import React from "react";

const CustomScreen = ({ fullWidth, offset = 0, children }) => {
  const childrenArr = React.Children.toArray(children);
  const title = childrenArr.length > 1 ? childrenArr[0] : null;
  const content = title ? childrenArr[1] : childrenArr[0];

  return (
    <div className="screen">
      {title && <div>{title}</div>}
      <div className="content">{content}</div>

      <style jsx>{`
        .screen {
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
          -moz-box-orient: vertical;
          -moz-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          min-height: ${offset ? `calc(100vh - ${offset}px)` : "100vh"};
        }
        .content {
          -webkit-box-align: center;
          -webkit-align-items: center;
          -moz-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -moz-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -moz-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          width: ${fullWidth ? "100%" : "auto"};
        }
      `}</style>
    </div>
  );
};

/*
CustomScreen.propTypes = {
  fullWidth: propTypes.bool,
  children: propTypes.node,
};
*/

export default CustomScreen;

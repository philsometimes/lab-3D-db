import React, {useEffect, useRef, Component} from 'react';
import styled from 'styled-components';

const ViewerBox = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
`

const ViewerFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

const version = '1.7.1'

const Viewer = (props) => {
    const targetRef = useRef(null);
    const urlid = props.url;
    useEffect(() => {
      const client = new window.Sketchfab(version, targetRef.current);
      client.init(urlid, {
          success: (api) => {
              api.start();
              api.addEventListener('viewerready', function() {
                  api.setPostProcessing({
                    enable: true,
                    vignetteEnable: false
                  })
              });
              console.log('Viewer initialized!');
          },
          error: function onError() {
              console.log('Viewer failed to initialize');
          },
          autospin: 0.1,
          autostart: 1,
          camera: 0,
          dof: 0,
          ui_stop: 0,
          transparent: 1,
          annotations_visible: 0,
          ui_annotations: 0,
          ui_animations: 0,
          ui_inspector: 0,
          ui_settings: 0,
          ui_vr: 0,
          ui_infos: 1,
          ui_hint: 0
      });
    }, [])

    return (
        <ViewerBox className="ViewerBox">
            <ViewerFrame ref={targetRef}
            src="about:blank"
            allowFullScreen="allowfullscreen"
            title="Viewer" width="640" height="400"
            frameBorder="0"></ViewerFrame>
        </ViewerBox>
    );
}

export default Viewer;